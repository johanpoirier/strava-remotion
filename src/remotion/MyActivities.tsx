import {
	Series
} from 'remotion';
import React, {useCallback, useContext} from 'react';
import Activity from '../components/Activity';
import {DataContext} from '../contexts/DataContext';
import {ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND} from "../tools/constants";

export const MyActivities: React.FC = () => {
	const activityList = useContext(DataContext);

	const renderActivity = (activity: any, index: number) => {
		return (
			<Series.Sequence durationInFrames={Math.round(FRAME_PER_SECOND * ACTIVITY_VIDEO_DURATION / 1000)} key={`seq-${index}`}>
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
