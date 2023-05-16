import {
	Series,
	delayRender,
	continueRender
} from 'remotion';
import React, {useState, useEffect, useCallback} from 'react';
import {fetchActivities} from '../services/strava';
import Activity from '../components/Activity';

export const MyActivities: React.FC = () => {
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
		return (
			<Series.Sequence durationInFrames={60} key={`seq-${index}`}>
				<Activity data={activity} index={index} />
			</Series.Sequence>
		);
	};
	const renderActivities = useCallback(() => {
		return (<Series>{data.map(renderActivity)}</Series>);
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
