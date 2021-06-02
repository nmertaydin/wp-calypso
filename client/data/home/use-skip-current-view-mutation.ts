/**
 * External dependencies
 */
import { useCallback } from 'react';
import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import config from '@automattic/calypso-config';

/**
 * Internal dependencies
 */
import wp from 'calypso/lib/wp';

type ReminderDuration = '1d' | '1w' | null;

interface Variables {
	siteId: number;
	reminder: ReminderDuration;
}

interface Result extends UseMutationResult< void, unknown, Variables > {
	skipCurrentView: ( siteId: number, reminder: ReminderDuration ) => void;
}

function useSkipCurrentViewMutation( siteId: number ): Result {
	const queryClient = useQueryClient();
	const mutation = useMutation< void, unknown, Variables >(
		( { siteId, reminder } ) =>
			wp.req.post( {
				path: `/sites/${ siteId }/home/layout/skip`,
				apiNamespace: 'wpcom/v2',
				...( config.isEnabled( 'home/layout-dev' ) && { query: { dev: true } } ),
				body: {
					...( reminder && { reminder } ),
				},
			} ),
		{
			onSuccess() {
				queryClient.invalidateQueries( [ 'home-layout', siteId ] );
			},
		}
	);

	const { mutate } = mutation;

	const skipCurrentView = useCallback(
		( siteId: number, reminder: ReminderDuration ) => {
			mutate( { siteId, reminder } );
		},
		[ mutate ]
	);

	return { skipCurrentView, ...mutation };
}

export default useSkipCurrentViewMutation;
