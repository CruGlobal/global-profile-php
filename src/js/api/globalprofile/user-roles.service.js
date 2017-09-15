(function ( module ) {
    'use strict';

    module.factory( 'UserRoles', function ( $log, $resource, Settings ) {
        return $resource(
            Settings.api.globalProfile( '/user_roles' ),
            null,
            {
                delete: {
                    url:    Settings.api.globalProfile( '/user_roles/:key_guid' ),
                    method: 'DELETE'
                }
            }
        );
    } );
})( angular.module( 'globalProfile.api.globalprofile' ) );
