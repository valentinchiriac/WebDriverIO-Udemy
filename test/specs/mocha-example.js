describe.skip ('This is the description of the test suite', () => {
    before(() => {
        console.log("runs once before the first test in this block");
    });

    after(() => {
        console.log("runs once after the last test in this block");
    });

    beforeEach(() => {
        console.log("runs once before each test in this block");
    });

    afterEach(() => {
        console.log("runs once after each test in this block");
    });

    it('This is the description of the first test in the suite', () => {
        console.log('First test executed');
    })
    it('This is the description of the second test in the suite', () => {
        console.log('Second test executed')
    });
})