const { error } = require('./src/constants');
const  File  = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {

    {
        const filePath = './mocks/emptyFile-invalid.csv';

        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);

        const result = File.csvToJson(filePath);

        await rejects(result,rejection);
    }

    {
        const filePath = './mocks/fourItems-invalid.csv';

        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

        const result = File.csvToJson(filePath);

        await rejects(result,rejection);
    }

    {

        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        Date.prototype.getFullYear = () => 2020;

        const expected = [
            {
              "id": 123,
              "name": "Marcos",
              "profession": "Jvascript",
              "birthday": 1996
            },
            {
              "id": 321,
              "name": "JOAO",
              "profession": "PHP",
              "birthday": 1941
            },
            {
              "id": 123,
              "name": "Pedro",
              "profession": "Java Developer",
              "birthday": 1981
            }
          ];

          deepStrictEqual(JSON.stringify(result),JSON.stringify(expected));
    }

})();