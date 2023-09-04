/**
 * Read CSV sample.
 */
function readCSV(fileName) {
  // Import sample data from CSV.
  const records = parse(fs.readFileSync(path.join(__dirname, '../input', fileName)));

  // Returns a list from which only the first column of the CSV is extracted.
  return records.map(record => record[0]);
}
