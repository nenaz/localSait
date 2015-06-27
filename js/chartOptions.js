google.load("visualization", "1.0", {'packages':["corechart"]});
//google.setOnLoadCallback(drawChart);
function drawChart() {
	var jsonData = createDataToChart();
	var data = new google.visualization.DataTable(jsonData);
	var options = {
		'title': 'Фильмы по категориям',
		'width':500,
		'height':500,
		'is3D':true,
		'slices':{
			0: {offset: 0.3},
			2: {offset: 0.3},
			5: {offset: 0.3},
			13: {offset: 0.3},
			10: {offset: 0.3},
		}
	};
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	chart.draw(data, options);
}

function createDataToChart(){
	var arrcountFOC = opt.arrCountFilmsOfCategory;
	var i=0, j=0, label = '', type = '', v = '', v0 ='', v1 = '', f = null;
	var arrData = {
		'cols': new Array(2),
		'rows': new Array(5)
	};
	for(i=0; i<2; i++){
		switch (i){
			case 0: label = 'категория'; type = 'string'; break;
			case 1: label = 'количество'; type = 'string'; break;
		}
		arrData.cols[i] = {
			'id':'',
			'label':label,
			'pattern':'',
			'type':type
		};
	}
	i=0;
	for(key in arrcountFOC){
		arrData.rows[i] = {
			'c': new Array(2)
		};
		v0 = key;
		v1 = arrcountFOC[key]*1;
		for(j=0; j<2; j++){
			switch (j){
				case 0: v = v0; break;
				case 1: v = v1; break;
			}
			arrData.rows[i].c[j] = {
				'v':v,
				'f':f
			}
		}
		i++;
	}
	var myJsonString = JSON.stringify(arrData);
	return myJsonString;
}