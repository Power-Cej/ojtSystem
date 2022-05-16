import classNames from "../drivers/react/classNames";

describe('classNames',()=>{
    it('should generate classes', function () {
        expect(classNames('bg-white')).toEqual("bg-white");
        expect(classNames('bg-white shadow')).toEqual("bg-white shadow");
        expect(classNames('bg-white bg-white')).toEqual("bg-white");
    });
});
