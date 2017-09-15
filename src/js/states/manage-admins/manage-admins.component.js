(function ( module ) {
    'use strict';

    module.component( 'manageAdmins', {
        templateUrl: 'js/states/manage-admins/manage-admins.html',
        bindings: {
            userRoles: '<',
            ministry: '<'
        },
        controller: function ( growl, gettext, $state, UserRoles ) {
            var vm = this;

            vm.addAdministrator = function () {
                if( !vm.newAdminEmail && !vm.newAdminGuid ){
                    growl.error( gettext( 'Please enter an email or GUID' ) );
                }
                UserRoles.save({
                    ministry: vm.ministry.min_code,
                    admin_email: vm.newAdminEmail,
                    admin_guid: vm.newAdminGuid
                }, function () {
                    growl.success( gettext( 'Added new admin' ) );
                    $state.reload();
                }, function () {
                    growl.error( gettext( 'Error adding new admin' ) );
                });
            };

            vm.removeAdmin = function ( person ) {
                UserRoles.delete(_.assign( {}, person, {
                    ministry: vm.ministry.min_code
                }), function () {
                    growl.success( gettext( 'Deleted admin' ) );
                    $state.reload();
                }, function () {
                    growl.error( gettext( 'Error deleting admin' ) );
                });
            };
        }
    } );
})( angular.module( 'globalProfile.states.manageAdmins' ) );
