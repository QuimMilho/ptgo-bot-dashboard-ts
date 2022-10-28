import { Collection } from 'discord.js';
import { ToadScheduler, AsyncTask, SimpleIntervalJob } from 'toad-scheduler';
import ExtendedClient from '../client/ExtendedClient';

export default class TimeManager {
	client: ExtendedClient;
	private scheduler: ToadScheduler;
	private timers: Collection<
		'1' | '5' | '10' | '15' | '30' | '60',
		(() => {})[]
	>;

	constructor(client: ExtendedClient) {
		this.client = client;
		this.scheduler = new ToadScheduler();
		this.timers = new Collection();
		this.timers.set('1', []);
		this.timers.set('5', []);
		this.timers.set('10', []);
		this.timers.set('15', []);
		this.timers.set('30', []);
		this.timers.set('60', []);
		this.start();
	}

	private start() {
		const task1 = new AsyncTask(
			'task1',
			async () => {
				const functions = this.timers.get('1');
				for (let i = 0; i < functions.length; i++) {
					const exe = functions[i];
					exe();
				}
			},
			console.log
		);

		const task5 = new AsyncTask(
			'task5',
			async () => {
				const functions = this.timers.get('5');
				for (let i = 0; i < functions.length; i++) {
					const exe = functions[i];
					exe();
				}
			},
			console.log
		);

		const task10 = new AsyncTask(
			'task10',
			async () => {
				const functions = this.timers.get('10');
				for (let i = 0; i < functions.length; i++) {
					const exe = functions[i];
					exe();
				}
			},
			console.log
		);

		const task15 = new AsyncTask(
			'task15',
			async () => {
				const functions = this.timers.get('15');
				for (let i = 0; i < functions.length; i++) {
					const exe = functions[i];
					exe();
				}
			},
			console.log
		);

		const task30 = new AsyncTask(
			'task30',
			async () => {
				const functions = this.timers.get('30');
				for (let i = 0; i < functions.length; i++) {
					const exe = functions[i];
					exe();
				}
			},
			console.log
		);

		const task60 = new AsyncTask(
			'task60',
			async () => {
				const functions = this.timers.get('60');
				for (let i = 0; i < functions.length; i++) {
					const exe = functions[i];
					exe();
				}
			},
			console.log
		);

		const job1 = new SimpleIntervalJob({ minutes: 1 }, task1);
		const job5 = new SimpleIntervalJob({ minutes: 5 }, task5);
		const job10 = new SimpleIntervalJob({ minutes: 10 }, task10);
		const job15 = new SimpleIntervalJob({ minutes: 15 }, task15);
		const job30 = new SimpleIntervalJob({ minutes: 30 }, task30);
		const job60 = new SimpleIntervalJob({ minutes: 60 }, task60);

		this.scheduler.addSimpleIntervalJob(job1);
		this.scheduler.addSimpleIntervalJob(job5);
		this.scheduler.addSimpleIntervalJob(job10);
		this.scheduler.addSimpleIntervalJob(job15);
		this.scheduler.addSimpleIntervalJob(job30);
		this.scheduler.addSimpleIntervalJob(job60);

		console.log('Timers começados!');
	}

	register(
		executable: () => {},
		timer: '1' | '5' | '10' | '15' | '30' | '60' = '1'
	) {
		this.timers.get(timer).push(executable);
		console.log('Adicionado timer a cada ' + timer + ' minutos!');
	}
}
