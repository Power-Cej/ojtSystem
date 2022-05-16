import changes from '../changes';
describe('changes', () => {
    it('should get changes', function () {
        expect(changes({name: 'john', age: 27}, {name: 'john', age: 27})).toEqual({});
        expect(changes({name: 'john', age: 27}, {name: 'doe', age: 27})).toEqual({name: 'doe'});
        expect(changes({name: 'john', age: 27}, {name: 'john', age: 28})).toEqual({age: 28});
        expect(changes({name: 'john', age: 27}, {name: 'doe', age: 28})).toEqual({name: 'doe', age: 28});
        expect(changes({name: 'john', age: 27}, {gender: 'male'})).toEqual({gender: 'male'});
    });
});
