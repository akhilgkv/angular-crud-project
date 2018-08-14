import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Crud } from './crud';

@Injectable() 
export class crudService {
    articleUrl = 'http://localhost:3000/articles';

    constructor(private http:Http){        
    }
    //for all data
    getAllArticles(): Observable<Crud[]> {
        return this.http.get(this.articleUrl).map(this.extractData).catch(this.handleError);
    }
    //new article data
    createArticle(article: Crud ) : Observable<number> {
        let cpHeaders = new Headers ({'content-type': 'application/json' });
        let options = new RequestOptions ({ headers:cpHeaders});        
        return this.http.post(this.articleUrl, article, options)
                .map(success => success.status)
                .catch(this.handleError);
    }
    //fetch article by id
    getArticleById(articleId : string) : Observable<Crud> {
        let cpHeaders = new Headers({'content-type': 'application/json'});
        let options = new RequestOptions({headers : cpHeaders});
        console.log(this.http.get(this.articleUrl + "/"+ articleId)
        .map(this.extractData).catch(this.handleError));
        return this.http.get(this.articleUrl + "/"+ articleId)
                    .map(this.extractData).catch(this.handleError);
                    
    }
    //update article data
    updateArticle(article:Crud): Observable<number> {
        let cpHeaders = new Headers ({'content-type': 'application/json'});
        let options = new RequestOptions({headers : cpHeaders});
        return this.http.put(this.articleUrl+"/"+ article.id, article, options)
        .map(success => success.status).catch(this.handleError);
    }
    //delete article data
    deleteArticleById(articleId:string):Observable<number> {
        let cpHeaders = new Headers ({'content-type' : 'application/json'});
        let options = new RequestOptions ({ headers : cpHeaders});
        return this.http.delete(this.articleUrl+"/" + articleId)
                    .map(success => success.status).catch(this.handleError);
    }
    private extractData(res : Response) {
        let body = res.json();
        return body;
    }
    private handleError(error : Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);

    }

}