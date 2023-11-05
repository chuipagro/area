import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../models/users.model';
import axios from 'axios';
import { sendEmail } from '../../utils/sendMail';
import { CronGestion } from '../../utils/cronGestion';

import * as cron from 'node-cron';

@Injectable()
export class GoogleService {
		private accessToken: string;
		
		constructor(private configService: ConfigService) {
		}
		
		async initialiseAccessToken(token: string) {
				this.accessToken = await this.getAccessToken(token);
		}
		
		async getAccessToken(token: string): Promise<string> {
				const user = await UserModel.findOne({ token: token });
				if(!user) {
						throw new Error('User not found');
				}
				let access_token;
				
				if(user.auth === undefined || user.auth === null) {
						throw new Error('User has no auth');
				}
				for (const auth of user.auth) {
						if(auth.oauthName === 'google') {
								access_token = auth.token;
						}
				}
				if(!access_token) {
						throw new Error('User has no github auth');
				}
				return access_token;
		}
		
		async sendMail(message: string, token: string): Promise<void> {
				const user = await UserModel.findOne({ token: token });
				if(!user) {
						throw new Error('User not found');
				}
				await sendEmail(user.mail, 'AREAu stand', message, "pablo.levy@epitech.eu");
		}
		
		async createForm(name: string, description: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://www.googleapis.com/forms/v1/forms`;
				const data = {
						'title': name,
						'description': description,
				};
				return await axios.post(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						},
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async createFormQuestion(formId: string, question: string, type: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://www.googleapis.com/forms/v1/forms/${formId}/questions`;
				const data = {
						'title': question,
						'type': type,
				};
				return await axios.post(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						},
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async deleteForm(formId: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://www.googleapis.com/forms/v1/forms/${formId}`;
				return await axios.delete(url, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						},
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async createGoogleSheet(name: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://sheets.googleapis.com/v4/spreadsheets`;
				const data = {
						'properties': {
								'title': name,
						},
				};
				return await axios.post(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						},
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async deleteGoogleSheet(sheetId: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;
				return await axios.delete(url, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						},
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async createGoogleDocs(name: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://docs.googleapis.com/v1/documents`;
				const data = {
						'title': name,
				};
				return await axios.post(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						},
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async deleteGoogleDocs(docId: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://docs.googleapis.com/v1/documents/${docId}`;
				return await axios.delete(url, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						},
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async modifyGoogleDocs(docId: string, content: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://docs.googleapis.com/v1/documents/${docId}`;
				const data = {
						'content': content,
				};
				return await axios.patch(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						},
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async createGoogleSlides(name: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://slides.googleapis.com/v1/presentations`;
				const data = {
						'title': name,
				};
				return await axios.post(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async deleteGoogleSlides(slideId: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://slides.googleapis.com/v1/presentations/${slideId}`;
				return await axios.delete(url, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async modifyGoogleSlides(slideId: string, content: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://slides.googleapis.com/v1/presentations/${slideId}`;
				const data = {
						'content': content,
				};
				return await axios.patch(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async createGoogleCalendar(name: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://www.googleapis.com/calendar/v3/calendars`;
				const data = {
						'summary': name,
				};
				return await axios.post(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async deleteGoogleCalendar(calendarId: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}`;
				return await axios.delete(url, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async modifyGoogleCalendar(calendarId: string, name: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}`;
				const data = {
						'summary': name,
				};
				return await axios.patch(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async createGoogleSite(name: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://sites.googleapis.com/v1/sites`;
				const data = {
						'name': name,
				};
				return await axios.post(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async deleteGoogleSite(siteId: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://sites.googleapis.com/v1/sites/${siteId}`;
				return await axios.delete(url, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async modifyGoogleSite(siteId: string, name: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://sites.googleapis.com/v1/sites/${siteId}`;
				const data = {
						'name': name,
				};
				return await axios.patch(url, data, {
						headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async createGoogleDrawing(name: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://www.googleapis.com/drive/v3/files`;
				const data = {
						'name': name,
						'mimeType': 'application/vnd.google-apps.drawing',
				};
				return await axios.post(url, data, {
						headers: {
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async deleteGoogleDrawing(drawingId: string): Promise<any> {
				const accessToken = this.accessToken;
				const url = `https://www.googleapis.com/drive/v3/files/${drawingId}`;
				
				return await axios.delete(url, {
						headers: {
								'Authorization': `Bearer ${accessToken}`,
						}
				}).then((response: any) => {
						return response.data;
				});
		}
		
		async getLastMail(): Promise<string | null> {
				const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages`;
				try {
						const response = await axios.get(url, {
								headers: { 'Authorization': `Bearer ${this.accessToken}` },
								params: { maxResults: 1 }
						});
						
						if(response.data.messages && response.data.messages.length > 0) {
								return response.data.messages[0].id;
						}
						return null;
				} catch (e) {
						return null;
				}
				
		}
		
		async checkNewMail(): Promise<string | null> {
				return new Promise<string | null>((resolve, reject) => {
						const timezone = "Europe/Paris";
						const cronGestion = new CronGestion();
						
						const getLastMail = async () => {
								let lastMail = await this.getLastMail();
								const dateAtCreation = new Date().toLocaleDateString();
								const timeAtCreation = new Date().toLocaleTimeString();
								const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);
								
								const job = cron.schedule(cronTimer, async () => {
										const newMail = await this.getLastMail();
										if(lastMail != newMail) {
												lastMail = newMail;
												resolve(lastMail);
										}
										return null;
								}, {
										scheduled: true,
										timezone,
								});
								job.start();
						}
						getLastMail();
				});
		}
}
