import { ExperimentAssignment } from '../types';
import * as Timing from './timing';

export function isAlive( experimentAssignment: ExperimentAssignment ) {
	return (
		experimentAssignment.ttl * Timing.MILLISECONDS_PER_SECOND +
			experimentAssignment.retrievedTimestamp <
		Timing.monotonicNow()
	);
}