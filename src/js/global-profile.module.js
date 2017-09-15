(function () {
	'use strict';

	angular.module( 'globalProfile', [
		// Dependencies
		'cas-auth-api',
		'ui.router',
		'globalProfile.common.settingsService',
		'globalProfile.api.globalprofile',
		'angular-growl',
		'gettext',

		// States
		'globalProfile.states.selectMinistry',
        'globalProfile.states.activate',
		'globalProfile.states.profile.edit',
		'globalProfile.states.admin.add',
		'globalProfile.states.admin.edit',
		'globalProfile.states.admin.import',
		'globalProfile.states.manageAdmins'
	] );
})();
