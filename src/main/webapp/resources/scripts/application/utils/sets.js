export function getWordSetsByStudentsList(students) {
	let sets = [];
  students[0].studentWordSets.forEach((set, index) => {
    sets.push(set.set)
  });
  return sets;
}
