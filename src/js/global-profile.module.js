(function () {
	'use strict';

	angular.module( 'globalProfile', [
		// Dependencies
		'ui.router',
		'globalProfile.common.settingsService',
		'globalProfile.api.measurements',

		// States
		'globalProfile.states.selectMinistry',
		'globalProfile.states.profile.edit',
		'globalProfile.states.admin.add',
		'globalProfile.states.admin.edit',
		'globalProfile.states.admin.import'
	] );
})();
