import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Crud } from './crud';
import { crudService } from './crud.service';


@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.css']
})

export class crudComponent implements OnInit {
    
    allArticles: Crud[];
    statusCode: number;
    requestProcessing = false;
    articleIdToUpdate = null;
    processValidation = false;
    
    
    articleForm = new FormGroup({
        title: new FormControl('', Validators.required),
        category : new FormControl('', Validators.required)
    });
    constructor(private crudService : crudService) {
    }
    ngOnInit() : void {
        this.getAllArticles();
    }
    getAllArticles() {
        this.crudService.getAllArticles()
        .subscribe(
                    data => this.allArticles = data,
                    errorCode => this.statusCode = errorCode);
    }
    // create and update the article
    onArticleFormSubmit() {
        this.processValidation = true;
        if(this.articleForm.invalid){
            return;
        }
    this.perProcessConfiguration();
    let article = this.articleForm.value;
    if(this.articleIdToUpdate === null) {
        // generating article Id with creations 
        this.crudService.getAllArticles()
        .subscribe(articles => {
        let maxIndex = articles.length - 1;
        let articleWithMaxIndex = article[maxIndex];
        let articleId = articleWithMaxIndex + 1;
        article.id = articleId;
             
        
        this.crudService.createArticle(article)
        .subscribe(successCode => {
            this.statusCode = successCode;
            this.getAllArticles();
            this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode
    );
    });
    } else {
        //to update article
        article.id = this.articleIdToUpdate;
        this.crudService.updateArticle(article)
            .subscribe(succesCode =>{
                this.statusCode = succesCode;
                this.getAllArticles();
                this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
}
    // Load article by id for edit
    loadArticleToEdit(articleId : string) {
        this.perProcessConfiguration();
        this.crudService.getArticleById(articleId)
        .subscribe(crud => {
            this.articleIdToUpdate = crud.id;
            this.articleForm.setValue({title: crud.title , category: crud.category});
            this.processValidation = true;
            this.requestProcessing =false;
        },
        errorCode => this.statusCode = errorCode);
    }
    //Delete Article
    deleteArticle(articleId : string) {
        this.perProcessConfiguration();
        this.crudService.deleteArticleById(articleId)
        .subscribe(successCode => {
            this.statusCode = 204;
            this.getAllArticles();
            this.backToCreateArticle();
        },
        errorCode => this.statusCode= errorCode);
    }
    perProcessConfiguration() {
        this.statusCode = null;
        this.requestProcessing = true;
    }
    backToCreateArticle() {
        this.articleIdToUpdate = null;
        this.articleForm.reset();
        this.processValidation = false;
    }
}