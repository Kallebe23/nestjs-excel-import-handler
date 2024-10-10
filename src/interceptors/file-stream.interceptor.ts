// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   // HttpStatus,
// } from '@nestjs/common';
// import * as busboy from 'busboy';
// import { Observable } from 'rxjs';

// @Injectable()
// export class FileStreamInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): any {
//     const request = context.switchToHttp().getRequest();
//     return new Observable((subscriber) => {
//       const bb = busboy({ headers: request.headers });

//       bb.on('file', (_name, file) => {
//         file.on('error', (error) => {
//           bb.emit('error', error); // propagate the error to the busboy error event
//         });

//         bb.emit('finished');
//         // this.closingDateService.handleImportFileStream(file, Number(supplierId));
//       });

//       request.pipe(bb);

//       bb.on('error', (error: Error) => {
//         request.unpipe(bb);
//         bb.removeAllListeners();
//         throw error;
//       });

//       bb.on('finished', () => {
//         console.log('here');
//         request.unpipe(bb);
//         bb.removeAllListeners();
//         subscriber.next();
//       });
//       console.log('check');
//     }).pipe(() => next.handle());
//   }
// }
