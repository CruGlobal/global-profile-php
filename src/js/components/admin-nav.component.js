(function ( module ) {
    'use strict';

    module.component( 'adminNav', {
        templateUrl: 'js/components/admin-nav.html',
        bindings: {
            isLeader: '<',
            isSuperAdmin: '<'
        }
    } );
})( angular.module( 'globalProfile.components.adminNav', [] ) );
