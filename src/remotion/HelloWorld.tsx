import {
	interpolate,
	Sequence,
	useCurrentFrame,
	delayRender,
	continueRender
} from 'remotion';
import React, {useState, useEffect, useCallback} from 'react';
import {fetchActivities} from "../services/strava";

const Title: React.FC<{title: string}> = ({title}) => {
	const frame = useCurrentFrame()
	const opacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'})

	return (
		<div style={{opacity}}>{title}</div>
	)
}

export const HelloWorld: React.FC = () => {
	const [data, setData] = useState<object[]>([]);
	const [handle] = useState(() => delayRender());

	const fetchData = useCallback(async () => {
		const json = await fetchActivities('');
		setData(json);

		continueRender(handle);
	}, [handle]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const renderActivity = (activity: any, index: number) => {
		// @ts-ignore
		return (
			<Sequence durationInFrames={30} from={30 * index}>
				<Title title={activity.id} />
			</Sequence>
		);
	};
	const renderActivities = useCallback(() => {
		return (<ul>{data.map(renderActivity)}</ul>);
	}, [data]);

	return (
		<div
			style={{
				flex: 1,
				textAlign: "center",
				fontSize: "7em",
				backgroundColor: "white",
			}}
		>
			{data.length ? renderActivities() : null}
		</div>
	);
};
