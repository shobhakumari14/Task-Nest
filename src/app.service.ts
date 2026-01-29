import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {;
  getHello(): string {
    return `  <!DOCTYPE html>
      <html>
        <head>
          <title>Backend Status</title>
          <style>
            body {
              margin: 0;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: Arial, sans-serif;
              background: #0f172a;
              color: #e5e7eb;
            }
            h1 {
              font-size: 2.5rem;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <h1>🚀 Backend is running</h1>
        </body>
      </html>`;
  }
}
