(function () {
    'use strict';

    angular
        .module( 'globalProfile.states.activate', [
            'ui.router',
            'globalProfile.states.app',
            'globalProfile.api.globalprofile',
        ] )
        .config( function ( $stateProvider ) {
            $stateProvider
                .state( 'activate', {
                    parent:  'app',
                    url:     'activate',
                    resolve: {
                        'requiresSuperAdmin': function ( $q, isSuperAdmin ) {
                            return isSuperAdmin ? $q.resolve() : $q.reject();
                        }
                    },
                    template: '<activate></activate>'
                } )
        } );

})();
