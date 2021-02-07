const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const {deepStrictEqual} = require('assert')


// Fibonacci : o próximo valo corresponde a soma dos dois anteriores;
;const { assert } = require('console');
(async () => {

    {

        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        
        for await(const i of fibonacci.execute(3)) {}

        // generators retornam iterators (.next)
        // 3 formas :
        // usando .next();
        // for await
        // rest/spread

        const expectedCallCount = 4;

        deepStrictEqual(spy.callCount,expectedCallCount)

        // console.log('callCount', spy.callCount);


    }

    {

        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);

        const [... results] = fibonacci.execute(5);

        // [0] input = 5, current = 0, next = 1;
        // [1] input = 4, current = 1, next = 1;
        // [2] input = 3, current = 2, next = 2;
        // [3] input = 2, current = 2, next = 3;
        // [4] input = 1, current = 3, next = 5;
        // [4] input = 0 - > Para!


        const {args} = spy.getCall(2);
        const expectedResult = [0,1,1,2,3];
        const expectedParams = Object.values({
            input : 3,
            current : 1,
            next : 2
        });


        deepStrictEqual(args,expectedParams);
        deepStrictEqual(results,expectedResult);
    }

})();