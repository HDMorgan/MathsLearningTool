export interface ILobbyInfo {
	teacherId: string;
	lessonId: string;
	currentQuestion: number;
	numberOfQuestions: number;
	students: string[];
	teacherName: string;
	lessonName: string;
	showAnswer: boolean;
}
