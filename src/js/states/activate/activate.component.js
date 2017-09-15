(function ( module ) {
    'use strict';

    module.component( 'activate', {
        templateUrl: 'js/states/activate/activate.html',
        controller: function ( growl, gettext, Ministries ) {
            var vm = this;
            vm.newMinistries = [];

            vm.activateMinistry = function () {
                Ministries.activate({
                    ministry_id: vm.newMinistryCode
                }, function () {
                    growl.success( gettext( 'Activated ministry' ) );
                    vm.newMinistries.push(vm.newMinistryCode);
                    vm.newMinistryCode = '';
                }, function () {
                    growl.error( gettext( 'Error activating ministry' ) );
                });
            };
        }
    } );
})( angular.module( 'globalProfile.states.activate' ) );
