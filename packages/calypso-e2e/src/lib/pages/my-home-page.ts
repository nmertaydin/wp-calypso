/**
 * Internal dependencies
 */
import { BaseContainer } from '../base-container';

/**
 * Type dependencies
 */
import { Page } from 'playwright';

const selectors = {
	dashboard: '.customer-home__main',
	statsCard: '.stats',
	visitSiteButton: 'text=Visit site',
};

/**
 * Page representing the WPCOM home dashboard.
 *
 * @augments {BaseContainer}
 */
export class MyHomePage extends BaseContainer {
	constructor( page: Page ) {
		super( page, selectors.dashboard );
	}

	async _postInit(): Promise< void > {
		await this.page.waitForSelector( selectors.statsCard );
	}

	/**
	 * Click on the Visit Site button on the home dashboard.
	 *
	 * @returns {Promise<void>} No return value.
	 */
	async visitSite(): Promise< void > {
		await this.page.waitForSelector( selectors.visitSiteButton );
		await Promise.all( [
			this.page.waitForNavigation(),
			this.page.click( selectors.visitSiteButton ),
		] );
	}
}
