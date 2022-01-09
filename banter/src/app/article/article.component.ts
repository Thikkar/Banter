import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { ChatService } from '../chat.service';

//NEED ARTICLE SCHEMA (content (title, author, body, etc. and comments), 
//store it in db, and have post requests enabled to the
// particular route (prob /articles/:id or /articles/:id/comments)

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ChatService]
})
export class ArticleComponent implements OnInit {
  article: any = JSON.parse(sessionStorage.chosenArticle);
  commentObjects: any = JSON.parse(sessionStorage.commentObjects);
  articleComments: {_id: any, comment: string, username: string}[] = [];

  currUser: any = JSON.parse(sessionStorage.currUser);
  
  comment: string = '';
  backBtnName: string = "← Back to News";
  postCommentBtnName: string = "Post Comment";

  constructor(private _http: HttpService, private _data: DataService, private _chat: ChatService) {
    /*
    if (sessionStorage.chosenArticle) {
      this.article = JSON.parse(sessionStorage.chosenArticle);
    } else {
      this.article = null;
    }*/

    this.articleComments = this.commentObjects;
    sessionStorage.setItem('articleComments', JSON.stringify(this.articleComments))    

    this._chat.newCommentReceived().subscribe((data: {_id: any, comment: string, username: string, time: string}) => {
      if (data._id == this.article._id) {
        this.commentObjects.push(data);
        console.log(data.time);
        sessionStorage.setItem('commentObjects', JSON.stringify(this.commentObjects))
        sessionStorage.setItem('articleComments', JSON.stringify(this.articleComments))
      }
      
      console.log(data)
      console.log(this.articleComments) 
    })
     
    this._chat.newUserJoined().subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit(): void {     
  }

  postComment(comment: string) {

    const commentTime = new Date().toLocaleString("en-US");

    const commentDetails = {
      title: this.article.title,
      comment: comment,
      username: this.currUser.username,
      time: commentTime
    }

    this._http.postComment(commentDetails).subscribe((data: any) => {
      sessionStorage.setItem('comments', JSON.stringify(this.articleComments))
      sessionStorage.setItem('commentObjects', JSON.stringify(data.comments))
      this.commentObjects = JSON.parse(sessionStorage.commentObjects)
    })

    const commentData = {
      article: this.article._id,
      username: this.currUser.username,
      comment: comment,
      time: commentTime
    }

    this._chat.sendComment(commentData); 

    this.articleComments = this.commentObjects;

    //reset comment
    this.comment = ''
  }

  deleteComment() {

  }



}
