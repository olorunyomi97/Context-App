function convertArrayOfObjectsToCSV(array: [object]) {
	let result;

	const columnDelimiter = ",";
	const lineDelimiter = "\n";
	const keys = Object.keys(array[0]);

	result = "";
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	array.forEach((item) => {
		let ctr = 0;
		keys.forEach((key) => {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];

			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}

export const downloadCSV = (array: any, filename: string) => {
	console.log(array);
	const link = document.createElement("a");
	let csv = convertArrayOfObjectsToCSV(array);
	if (csv == null) return;

	const filename_ = filename || "export.csv";

	if (!csv.match(/^data:text\/csv/i)) {
		csv = `data:text/csv;charset=utf-8,${csv}`;
	}

	link.setAttribute("href", encodeURI(csv));
	link.setAttribute("download", filename_);
	link.click();
};
