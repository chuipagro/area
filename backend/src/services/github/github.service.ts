import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../models/users.model';

@Injectable()
export class GithubService {
  private clientID: string | undefined;
  private clientSECRET: string | undefined;
  private callbackURL: string | undefined;
  private code: string | null;
  private baseUrl = `https://api.github.com/user`;
  private accessToken: string;

  constructor(private configService: ConfigService) {
    this.clientID = this.configService.get<string>('GITHUB_CLIENT_ID');
    this.clientSECRET = this.configService.get<string>('GITHUB_CLIENT_SECRET');
    this.callbackURL = this.configService.get<string>('GITHUB_CALLBACK_URL');
    if (!this.clientID) {
      throw new Error('GITHUB_CLIENT_ID is undefined');
    }
    if (!this.clientSECRET) {
      throw new Error('GITHUB_CLIENT_SECRET is undefined');
    }
  }
  async initialiseAccessToken(token: string) {
    this.accessToken = await this.getAccessToken(token);
  }
  
  async getAccessToken(token: string): Promise<string> {
    const user = await UserModel.findOne({ token: token });
    if (!user) {
      throw new Error('User not found');
    }
    let access_token;
    
    if (user.auth === undefined || user.auth === null) {
      throw new Error('User has no auth');
    }
    for (const auth of user.auth) {
      if (auth.oauthName === 'github') {
        access_token = auth.token;
      }
    }
    if (!access_token) {
      console.log('User has no github auth');
      return '';
    }
    return access_token;
  }

  async postToken(): Promise<any> {
    const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${this.clientID}&scope=user&redirect_uri=${this.callbackURL}`;

    console.log(this.code);
    return await axios.get(githubOAuthURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response: any) => {
      return response.data.access_token;
    });
  }

  async getUserProfileData(): Promise<any> {
    const access_token = await this.postToken();

    return await axios.get(this.baseUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'User-Agent': 'Area',
    }
    }).then((response: any) => {
      return response.data;
    });
  };
  
  async createRepo(name: string, description: string, homepage: string, privateRepo: boolean): Promise<void> {
    const url = `https://api.github.com/user/repos`;
    
    const body = {
      name: name,
      description: description,
      homepage: homepage,
      private: privateRepo,
    };
    
    return await axios.post(url, body, {
      headers: {
        'Authorization': this.accessToken,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async modifyRepoName(repoName: string, owner: string, newName: string): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}`;
    
    return await axios.patch(url, { name: newName }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async modifyRepoDescription(repoName: string, owner: string, newDescription: string): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}`;
    
    return await axios.patch(url, { description: newDescription }, {
      headers: {
        'Authorization': this.accessToken,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async modifyRepoStatus(repoName: string, owner: string, newStatus: boolean): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}`;
    
    return await axios.patch(url, { private: newStatus }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async deleteRepo(repoName: string, owner: string): Promise<void> {
    const url = `https://api.github.com/repos/Chasfory/laetitia`;
    
    return await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async starRepo(repoName: string, owner: string): Promise<void> {
    const url = `https://api.github.com/user/starred/${owner}/${repoName}`;
    
    return await axios.put(url, {}, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async unstarRepo(repoName: string, owner: string): Promise<void> {
    const url = `https://api.github.com/user/starred/${owner}/${repoName}`;
    
    return await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async forkRepo(repoName: string, owner: string): Promise<void> {
    const access_token = await this.postToken();
    const url = `https://api.github.com/repos/${owner}/${repoName}/forks`;
    
    return await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async createIssue(repoName: string, owner: string, title: string, body: string): Promise<void> {
    const access_token = await this.postToken();
    const url = `https://api.github.com/repos/${owner}/${repoName}/issues`;
    
    return await axios.post(url, { title: title, body: body }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async modifyIssueTitle(repoName: string, owner: string, issueNumber: number, newTitle: string): Promise<void> {
    const access_token = await this.postToken();
    const url = `https://api.github.com/repos/${owner}/${repoName}/issues/${issueNumber}`;
    
    return await axios.patch(url, { title: newTitle }, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async modifyIssueBody(repoName: string, owner: string, issueNumber: number, newBody: string): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}/issues/${issueNumber}`;
    
    return await axios.patch(url, { body: newBody }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    }).then((response: any) => {
      return response.data;
    });
  }
  
  async closeIssue(repoName: string, owner: string, issueNumber: number): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}/issues/${issueNumber}`;
    
    return await axios.patch(url, { state: 'closed' }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async createPullRequest(repoName: string, owner: string, title: string, body: string, head: string, base: string): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}/pulls`;
    
    return await axios.post(url, { title: title, body: body, head: head, base: base }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async mergePullRequest(repoName: string, owner: string, pullNumber: number): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}/pulls/${pullNumber}/merge`;
    
    return await axios.put(url, {}, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async closePullRequest(repoName: string, owner: string, pullNumber: number): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}/pulls/${pullNumber}`;
    
    return await axios.patch(url, { state: 'closed' }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async createBranch(repoName: string, owner: string, branchName: string, sha: string): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}/git/refs`;
    
    return await axios.post(url, { ref: `refs/heads/${branchName}`, sha: sha }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async deleteBranch(repoName: string, owner: string, branchName: string): Promise<void> {
    const url = `https://api.github.com/repos/${owner}/${repoName}/git/refs/heads/${branchName}`;
    
    return await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async createGist(description: string, files: any): Promise<void> {
    const url = `https://api.github.com/gists`;
    
    return await axios.post(url, { description: description, files: files }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async modifyGistDescription(gistId: string, newDescription: string): Promise<void> {
    const url = `https://api.github.com/gists/${gistId}`;
    
    return await axios.patch(url, { description: newDescription }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async modifyGistName(gistId: string, newName: string): Promise<void> {
    const url = `https://api.github.com/gists/${gistId}`;
    
    return await axios.patch(url, { files: { [newName]: null } }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
    async modifyGistContent(gistId: string, fileName: string, newContent: string): Promise<void> {
    const url = `https://api.github.com/gists/${gistId}`;
    
    return await axios.patch(url, { files: { [fileName]: { content: newContent } } }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async createOrganization(name: string, description: string, billingEmail: string): Promise<void> {
    const url = `https://api.github.com/orgs`;
    
    return await axios.post(url, { login: name, description: description, billing_email: billingEmail }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async modifyOrganization(name: string, description: string, billingEmail: string): Promise<void> {
    const url = `https://api.github.com/orgs/${name}`;
    
    return await axios.patch(url, { description: description, billing_email: billingEmail }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async deleteOrganization(name: string): Promise<void> {
    const url = `https://api.github.com/orgs/${name}`;
    
    return await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
  
  async modifyUserName(newName: string): Promise<void> {
    const url = `https://api.github.com/user`;
    
    return await axios.patch(url, { name: newName }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    },
    });
  }
}
