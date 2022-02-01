import axios from 'axios';

export async function get({ params }) {
	const url = `http://onlineraceresults.com/race/view_race.php?race_id=${params.race_id}&submit_action=select_result&order_by=default&group_by=default#results`;

	try {
	    const response = await axios.get(url);
	    console.log(response.data);

	    return {
	    	data: response
	    };
	  } catch (error) {
	  	return {
	  		e: error,
	  		status: res.status,
	  		error: new Error(`Could not load race: ${race_id}\n ${res.statusText}`)
	  	};
	    console.error(error);
	  }
}
