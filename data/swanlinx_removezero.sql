
SELECT 
	COALESCE(points.fruit_veg, 0) AS fuit_veg,
	COALESCE(points.drink_ind, 0) AS drink_ind,
	COALESCE(points.sleep_time, 0) AS sleep_time,
	COALESCE(points.fit_ind, 0) AS fit_ind,
	COALESCE(points.health_ind, 0) AS health_ind,
	COALESCE(points.bleep_m, 0) AS bleep_m,
	COALESCE(points.bleep_f, 0) AS bleep_f,
	COALESCE(points.bmi_m, 0) AS bmi_m,
	COALESCE(points.bmi_f, 0) AS bmi_f,
	COALESCE(points.grip_m, 0) AS grip_m,
	COALESCE(points.grip_f, 0) AS grip_f,
	points.geom AS geom
FROM points
ORDER BY points.bmi_m ASC;
 