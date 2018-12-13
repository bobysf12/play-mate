export interface Comment {
	id?: string;
	text: string;
	type: string;
	created_at: Date;
	user_id: number;
}

interface CommentState {
	/**
	 * Comments mapped by comment id
	 */
	commentsMap: Record<string, Comment>;
	isCreatingComment: boolean;
	isLoadingComment: boolean;
}

export type CommentsState = Record<string, CommentState>;
