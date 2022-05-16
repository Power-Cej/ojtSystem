import flatten from '../flatten';
describe('flatten', function () {
    it('should flat object to csv format', function () {
        const john = {id: 'jo', username: 'john'};
        const category = {name: 'android', parent: {name: 'mobile'}};
        const post = {
            id: 'tut',
            title: 'tutorial',
            author: john,
            category: category,
        };
        const expected = [
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile'
            }
        ];
        expect(flatten(post)).toEqual(expected);
    });
    it('should flat object with array to csv format', function () {
        const roles = [{name: 'admin'}, {name: 'moderator'}]
        const comments = [
            {id: 'th', comment: 'thanks'},
            {id: 'wo', comment: 'wow'},
        ];
        const post = {
            roles: roles,
            comments: comments,
        };
        const expected = [
            {
                roles_name: 'admin',
                comments_id: 'th',
                comments_comment: 'thanks'
            },
            {
                roles_name: 'admin',
                comments_id: 'wo',
                comments_comment: 'wow'
            },
            {
                roles_name: 'moderator',
                comments_id: 'th',
                comments_comment: 'thanks'
            },
            {
                roles_name: 'moderator',
                comments_id: 'wo',
                comments_comment: 'wow'
            }
        ];
        expect(flatten(post)).toEqual(expected);
    });
    it('should flat nested object and array to csv format', function () {
        const john = {id: 'jo', username: 'john'};
        const category = {name: 'android', parent: {name: 'mobile'}};
        const roles = [{name: 'admin'}, {name: 'moderator'}]
        const comments = [
            {id: 'th', comment: 'thanks'},
            {id: 'wo', comment: 'wow'},
        ];
        const post = {
            id: 'tut',
            title: 'tutorial',
            author: john,
            category: category,
            roles: roles,
            comments: comments,
        };
        const expected = [
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile',
                roles_name: 'admin',
                comments_id: 'th',
                comments_comment: 'thanks'
            },
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile',
                roles_name: 'admin',
                comments_id: 'wo',
                comments_comment: 'wow'
            },
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile',
                roles_name: 'moderator',
                comments_id: 'th',
                comments_comment: 'thanks'
            },
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile',
                roles_name: 'moderator',
                comments_id: 'wo',
                comments_comment: 'wow'
            }
        ];
        expect(flatten(post)).toEqual(expected);
    });
    it('should flat nested array to csv format', function () {
        const roles = [{name: 'admin'}, {name: 'moderator'}]
        const categories = [{category: 'mobile'}, {category: 'web'}]
        const comments = [
            {
                id: 'th',
                comment: 'thanks',
                categories: categories
            },
            {
                id: 'wo',
                comment: 'wow',
                categories: categories
            },
        ];
        const post = {
            roles: roles,
            comments: comments,
        };
        const expected = [
            {
                roles_name: 'admin',
                comments_id: 'th',
                comments_comment: 'thanks',
                comments_categories_category: 'mobile'
            },
            {
                roles_name: 'admin',
                comments_id: 'th',
                comments_comment: 'thanks',
                comments_categories_category: 'web'
            },
            {
                roles_name: 'admin',
                comments_id: 'wo',
                comments_comment: 'wow',
                comments_categories_category: 'mobile'
            },
            {
                roles_name: 'admin',
                comments_id: 'wo',
                comments_comment: 'wow',
                comments_categories_category: 'web'
            },
            {
                roles_name: 'moderator',
                comments_id: 'th',
                comments_comment: 'thanks',
                comments_categories_category: 'mobile'
            },
            {
                roles_name: 'moderator',
                comments_id: 'th',
                comments_comment: 'thanks',
                comments_categories_category: 'web'
            },
            {
                roles_name: 'moderator',
                comments_id: 'wo',
                comments_comment: 'wow',
                comments_categories_category: 'mobile'
            },
            {
                roles_name: 'moderator',
                comments_id: 'wo',
                comments_comment: 'wow',
                comments_categories_category: 'web'
            }
        ];
        expect(flatten(post)).toEqual(expected);
    });
});
