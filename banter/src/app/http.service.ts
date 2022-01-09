import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getNews(team: string, startDate: string, endDate: string, page: string) {
    let url: string = '';
    url = 'https://newsapi.org/v2/top-headlines?q='+team+'&from='+startDate+'&to='+endDate+'&page='+page+'&country=us&category=sports&publishedAt&apiKey=96de0679808d40cdbf906dbbd2dbbf68';

    //url = 'https://newsapi.org/v2/top-headlines?q=&country=us&category=sports&publishedAt&apiKey=96de0679808d40cdbf906dbbd2dbbf68';
    return this._http.get(url);
  }

  addArticle(articleDetails: any) {
    return this._http.post('http://localhost:3000/api/articles', articleDetails);
  }

  postComment(commentDetails: any ) {
    return this._http.patch('http://localhost:3000/api/articles', commentDetails);
  }
  
  /*getArticles() {
    const url = 'http://localhost:3000/api/articles';
    return this._http.get(url);
  }*/

  getArticles(title: String) {
    const url = 'http://localhost:3000/api/articles/' + title; 
    return this._http.get(url);
  }

  /*
  findArticle(articleTitle: string) {
    const url = 'http://localhost:3000/api/articles'
    let allArticles = this.getArticles()
    allArticles.subscribe((data: any) => {
      let allArticles = data
      let chosenArticle = allArticles.filter((a: { title: any; }) => a.title === articleTitle)[0]
      return chosenArticle
    })
  }*/
}
