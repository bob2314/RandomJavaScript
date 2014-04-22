define(function() {

require.config({
    paths: {
        fyre: 'http://zor.livefyre.com/wjs/v3.0/javascripts/livefyre'
    }
});

config = {
    network: 'livefyre.com',
    siteId: '325501',
    defaultArticleIdForModal: 'sxsw_empty',
    collections: {
        livefyreAtSxsw: {
            wall: 'sxsw_livefyre_at_wall_0',
            feed: 'sxsw_livefyre_at_feed_0'
        },
        wall: 'sxsw_wall_0'
    }
};

return config;

});
