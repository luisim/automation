import LaunchDarkly from 'launchdarkly-node-client-sdk';
import { TRAINING_CLIENT_USER_AUTH0_ID } from './tests/constants';

/**
 * Class to interact with Launch Darkly client in the tests.
 * We use LD to handle Feature Flags.
 */
export class LDClientClass {
	client: LaunchDarkly.LDClient | undefined;
	clientId: string | undefined;

	#context = {
		kind: 'user',
		key: TRAINING_CLIENT_USER_AUTH0_ID,
	};

	/**
	 * Defines the Launch Darkly Client Id to use depending on the environment
	 * the tests are running on.
	 */
	constructor(){
		this.clientId = process.env.LAUNCH_DARKLY_FELLOW_CLIENT_ID
	}

	/**
	 * Initializes the LD client with the test user defined in the constants
	 * and pointing to a LD project depending on the environment.
	 */
	initialize = async () => {
		let c: LaunchDarkly.LDClient | undefined;
		if (!this.clientId) {
			throw new Error("Must provide a client Id to initialize LD")
		}
		c = LaunchDarkly.initialize(
			this.clientId,
			this.#context
		);
		await c
			?.waitForInitialization()
			.then(() => {
				console.log('LD initialization successful');
				this.client = c;
			})
			.catch((err) => {
				console.log('LD initialization failed:');
				console.error(err);
			});
	};
	
	/**
	 * Get the instantiated Launch Darkly client class with the project's client
	 * id provided in the constructor
	 */
	get clientInstance() {
		if(!this.client){
			throw new Error("Launch Darkly client must be initialized first!")
		}
		return this.client;
	}

	/**
	 * Get all available flags in Launch Darkly related to the project's client
	 * id provided in the constructor
	 */
	get flags() {
		return this.clientInstance.allFlags()
	}

}
