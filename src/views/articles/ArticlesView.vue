<template>
	<v-row>
		<v-col cols="12">
			<div class="buttons-row">
				<v-btn
					color="green"
					@click="opencreateArticleDialog()"
					prepend-icon="mdi-plus"
					>Create</v-btn
				>
			</div>
		</v-col>
	</v-row>
	<v-row>
		<v-col
			v-for="article in articles"
			:key="article.id"
			class="d-flex child-flex"
			cols="12"
			md="5"
			sm="6"
			lg="4"
			xl="3"
			xxl="2"
		>
			<v-card>
				<v-card-item>
					<v-card-title>
						<v-row>
							<v-col cols="8">
								{{ article.title }}
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-subtitle>
						<v-row>
							<v-col cols="8">
								{{ article.author }}
							</v-col>
						</v-row>
					</v-card-subtitle>
				</v-card-item>
				<v-card-item>
					<v-card-text>
						<v-img :src="article.image_url" alt="Article Image" />
					</v-card-text>
				</v-card-item>
				<v-card-item>
					<v-card-text>
						{{ article.link }}
					</v-card-text>
				</v-card-item>
				<v-card-item>
					<v-card-text>
						<div class="topic-chips">
							<v-chip
								v-for="t in article.topics"
								:key="t.id"
								small
							>
								{{ t.name }}
							</v-chip>
						</div>
					</v-card-text>
				</v-card-item>

				<v-card-actions>
					<v-row>
						<v-col cols="12">
							<v-btn
								color="green"
								@click="openEditDialog(article)"
								prepend-icon="mdi-pencil"
								>Edit</v-btn
							>
							<v-btn
								color="red"
								@click="openDeleteDialog(article)"
								prepend-icon="mdi-delete"
								>Delete</v-btn
							>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
	<v-dialog v-model="createArticleDialog" width="1024">
		<v-card>
			<v-card-title>
				<span class="text-h5">Create Article</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" class="d-flex justify-end">
							<v-btn
								color="grey"
								@click="closecreateArticleDialog()"
								>Close</v-btn
							>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="newArticle.title"
								label="Title"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="newArticle.author"
								label="Author"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="newArticle.link"
								label="Link"
								required
							></v-text-field>
						</v-col>
						<v-select
							v-model="newArticle.publication_id"
							label="Publication"
							:items="publications"
							item-title="name"
							item-value="id"
						></v-select>
						<v-select
							v-model="newArticle.topics"
							label="Topics"
							:items="topics"
							item-title="name"
							item-value="id"
							multiple
							chips
						></v-select>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-file-input
								label="Image"
								accept="image/*"
								@change="onNewArticleFileChange"
							></v-file-input>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" class="d-flex justify-end">
							<v-btn color="green" @click="createArticle()">
								Create Article
							</v-btn>
						</v-col>
					</v-row>
				</v-container>

				<v-alert v-if="newArticleErrorMessage" type="error">
					{{ newArticleErrorMessage }}
				</v-alert>
			</v-card-text>
		</v-card>
	</v-dialog>
	<v-dialog v-model="editArticleDialog" width="1024">
		<v-card>
			<v-card-title>
				<span class="text-h5">Edit Article</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" class="d-flex justify-end">
							<v-btn
								color="grey"
								@click="editArticleDialog = false"
								>Close</v-btn
							>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="editArticle.title"
								label="Title"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="editArticle.author"
								label="Author"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="editArticle.link"
								label="Link"
								required
							></v-text-field>
						</v-col>
						<v-select
							v-model="editArticle.publication_id"
							label="Publication"
							:items="publications"
							item-title="name"
							item-value="id"
						></v-select>
						<v-select
							v-model="editArticle.topics"
							:items="topics"
							item-title="name"
							item-value="id"
							multiple
							chips
							label="Topics"
						/>
					</v-row>
					<v-row>
						<v-col cols="12">
							<div v-if="editImageChangeDialogBtn">
								<v-file-input
									label="Image"
									accept="image/*"
									@change="onExistingArticleImageChange"
								></v-file-input>
								<v-btn @click="editImageChangeDialogBtn = false"
									>Cancel File Change</v-btn
								>
							</div>

							<v-btn
								v-else
								@click="editImageChangeDialogBtn = true"
								>Edit image</v-btn
							>
						</v-col>
					</v-row>
				</v-container>

				<v-alert v-if="editArticleErrorMessage" type="error">
					{{ editArticleErrorMessage }}
				</v-alert>
			</v-card-text>
			<v-card-actions class="d-flex justify-end">
				<v-btn
					color="green"
					@click="updateArticle()"
					:loading="articleIsUpdating"
					:disabled="articleIsUpdating"
				>
					Update
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<v-dialog v-model="deleteArticleDialog" width="1200" persistent>
		<v-card>
			<v-card-title class="text-h5">
				Are you sure you want to delete this article?
			</v-card-title>
			<v-card-actions>
				<v-btn
					color="red"
					@click="deleteArticle()"
					:loading="articleIsDeleting"
					:disabled="articleIsDeleting"
					>Delete</v-btn
				>
				<v-spacer></v-spacer>
				<v-btn color="grey" @click="deleteArticleDialog = false"
					>Cancel</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script src="./ArticlesView.ts"></script>
<style src="./ArticlesView.scss"></style>
