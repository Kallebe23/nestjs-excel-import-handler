import {
  Controller,
  HttpStatus,
  Next,
  Post,
  Req,
  Res,
  // UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as busboy from 'busboy';
import * as ExcelJS from 'exceljs';

async function handleFileStream(file: any) {
  try {
    // Create ExcelJS workbook reader and pass the stream
    const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(file, {});

    for await (const worksheetReader of workbookReader) {
      for await (const row of worksheetReader) {
        // throw new UnauthorizedException();
        console.log(row.values);
      }
      break;
    }
    file.emit('finished');
  } catch (error) {
    file.emit('error', error);
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/test/import')
  uploadFile(@Req() req, @Res() res, @Next() next) {
    const bb = busboy({ headers: req.headers });

    bb.on('file', (_name, file) => {
      file.on('error', (error) => {
        bb.emit('error', error); // propagate the error to the busboy error event
      });

      file.on('finished', () => {
        bb.emit('finished'); // propagate the error to the busboy
      });

      handleFileStream(file);
    });

    bb.on('error', (error: Error) => {
      req.unpipe(bb);
      bb.removeAllListeners();
      next(error);
    });

    bb.on('finished', () => {
      req.unpipe(bb);
      bb.removeAllListeners();
      res.status(HttpStatus.OK).json();
    });

    req.pipe(bb);
  }
}
