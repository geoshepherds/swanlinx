UPDATE points 
SET 	bmi_m = COALESCE(NULLIF(points.bmi_m, 0)),
	bmi_f = COALESCE(NULLIF(points.bmi_f, 0)),
	bleep_m = COALESCE(NULLIF(points.bleep_m, 0)),
	bleep_f = COALESCE(NULLIF(points.bleep_f, 0)),
	grip_m = COALESCE(NULLIF(points.grip_m, 0)),
	grip_f = COALESCE(NULLIF(points.grip_f, 0)),
	sleep_time = COALESCE(NULLIF(points.sleep_time, 0)),
	fit_ind = COALESCE(NULLIF(points.fit_ind, 0)),
	health_ind = COALESCE(NULLIF(points.health_ind, 0)),
	drink_ind = COALESCE(NULLIF(points.drink_ind, 0))
 
	
 