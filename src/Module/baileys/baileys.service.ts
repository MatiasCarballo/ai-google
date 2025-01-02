import { Injectable } from '@nestjs/common';
import { useMultiFileAuthState, makeWASocket, fetchLatestBaileysVersion, AuthenticationState } from '@whiskeysockets/baileys';
import * as qrcode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

@Injectable()
export class BaileysService {
  private socket;
  private authState: AuthenticationState; 

  constructor() {
    this.initializeBaileys();
  }

  async initializeBaileys() {
    try {
      // Multi-file authentication setup
      const { state, saveCreds } = await useMultiFileAuthState(path.resolve(__dirname, '../../../auth'));
      this.authState = state;

      // Fetch the latest Baileys version
      const { version } = await fetchLatestBaileysVersion();

      // Initialize WhatsApp socket
      this.socket = makeWASocket({
        version,
        auth: this.authState,
      });

      // Save credentials on update
      this.socket.ev.on('creds.update', saveCreds);

      this.socket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          await this.handleQR(qr); // Generate QR image
        }

        if (connection === 'open') {
          await this.removeQRFile(); // Remove QR file on successful connection
          await saveCreds(); // Save credentials
        }

        if (connection === 'close') {
          await this.handleConnectionClose(lastDisconnect.error.output.payload.message);
        }
      });

      // Listen for new messages
      this.socket.ev.on('messages.upsert', (m) => {
        const message = m.messages[0];
        if (!message.key.fromMe) {
          this.socket.sendMessage(message.key.remoteJid, { text: '¡Hola! 👋' });
        }
      });
    } catch (error) {
      console.error('Error initializing Baileys:', error);
    }
  }

  // Handle QR code generation and save it as an image
  private async handleQR(qr: string) {
    const qrImagePath = path.resolve(__dirname, '../../../qr-code.png');
    try {
      await qrcode.toFile(qrImagePath, qr);
      console.log('QR code saved:', qrImagePath);
    } catch (err) {
      console.error('Error generating QR file:', err);
    }
  }

  // Remove QR code file
  private async removeQRFile() {
    const filePath = path.resolve(__dirname, '../../../qr-code.png');
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log(`QR file removed: ${filePath}`);
      }
    } catch (error) {
      console.error('Error removing QR file:', error);
    }
  }

  // Handle connection close and restart logic
  private async handleConnectionClose(error: string) {
    try {
      const authPath = path.resolve(__dirname, '../../../auth');
      if (error === 'Stream Errored (restart required)') {
        this.initializeBaileys(); // Restart connection
      } else if (error === 'Stream Errored (conflict)') {
        const userConfirmed = await this.waitForUserInput();
        if (userConfirmed) {
          await this.deleteFilesInFolder(authPath);
          this.initializeBaileys();
        }
      } else if (error === 'Connection Failure') {
        await this.deleteFilesInFolder(authPath);
        this.initializeBaileys();
      }
    } catch (err) {
      console.error('Error handling connection close:', err);
    }
  }

  // Prompt user for confirmation in the terminal
  private async waitForUserInput(): Promise<boolean> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (query: string): Promise<string> =>
      new Promise((resolve) => rl.question(query, resolve));

    const answer = await question('Do you authorize this action? (y/n): ');
    rl.close();
    const a = answer.toLowerCase() === 'y';
    
    if(!a){
      await this.waitForUserInput();
    }
    return a;
  }

  // Delete all files in the specified folder
  private async deleteFilesInFolder(folderPath: string) {
    try {
      const files = await fs.promises.readdir(folderPath);
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stat = await fs.promises.stat(filePath);
        if (stat.isFile()) {
          await fs.promises.unlink(filePath);
          console.log(`File removed: ${filePath}`);
        }
      }
      console.log('All files removed from folder.');
    } catch (error) {
      console.error('Error deleting files in folder:', error);
    }
  }
}
