import {
	Series
} from 'remotion';
import React, {useCallback, useContext} from 'react';
import Activity from '../components/Activity';
import {DataContext} from "../contexts/DataContext";

export const MyActivities: React.FC = () => {
	const activityList = useContext(DataContext);

	const renderActivity = (activity: any, index: number) => {
		return (
			<Series.Sequence durationInFrames={60} key={`seq-${index}`}>
				<Activity data={activity} />
			</Series.Sequence>
		);
	};
	const renderActivities = useCallback(() => {
		return (<Series>{activityList.map(renderActivity)}</Series>);
	}, [activityList]);

	return (
		<div
			style={{
				flex: 1,
				textAlign: "center",
				fontSize: "7em",
				backgroundColor: "white",
			}}
		>
			{activityList.length ? renderActivities() : null}
		</div>
	);
};
