import LRUCache from '../LRUCache';
describe('LRU', function () {
    it('should limit', function () {
        const lru = new LRUCache(3);
        lru.put('one', 1);
        lru.put('two', 2);
        lru.put('three', 3);
        expect(lru.get('one')).toEqual(1);
        expect(lru.get('two')).toEqual(2);
        expect(lru.get('three')).toEqual(3);
        expect(lru.get('four')).toBeUndefined();
        expect(lru.values()).toEqual([1, 2, 3]);
        // test limit
        lru.put('four', 4);
        expect(lru.get('one')).toBeUndefined();
        expect(lru.get('two')).toEqual(2);
        expect(lru.get('three')).toEqual(3);
        expect(lru.get('four')).toEqual(4);
        expect(lru.values()).toEqual([2, 3, 4]);
        // test update
        lru.put('four', 5);
        expect(lru.get('four')).toEqual(5);
        expect(lru.values()).toEqual([2, 3, 5]);
        // test delete
        lru.delete('four');
        expect(lru.values()).toEqual([2, 3]);
        // clear
        lru.clear();
        expect(lru.values()).toEqual([]);
    });
});
