import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: createPost :: error', error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: updatePost :: error', error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite service :: deletePost :: error', error);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite service :: getPost :: error', error);
    }
  }

  async getPosts(queries = [Query.equal('status', 'Active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log('Appwrite service :: getPost :: error', error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appWriteStorageId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log('Appwrite service :: uploadFile :: error', error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(conf.appWriteStorageId, fileId);
    } catch (error) {
      console.log('Appwrite service :: deleteFile :: error', error);
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appWriteStorageId, fileId);
  }
}

const service = new Service();

export default service;
