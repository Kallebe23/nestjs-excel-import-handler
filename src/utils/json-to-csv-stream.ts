import { Transform } from 'stream';

const createJsonToCsvStream = () => {
  return new Transform({
    encoding: 'utf8',
    transform: (chunk, encoding, cb) => {
      // Extract the keys (column names) and their corresponding values
      const object = JSON.parse(chunk)

      if(object.rowNumber === 3) {
        cb(null, new Error('validation error'))
        return
      }
      const headers = Object.keys(object);
      const values = headers.map((header) => object[header]);

      // Join the values with a separator (e.g., ';') and add a newline at the end
      cb(null, values.join(';') + '\n');
    },
  });
};

export { createJsonToCsvStream }
