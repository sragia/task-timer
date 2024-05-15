<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import Input from '$lib/components/ui/input/input.svelte';
	import { dateHandler } from '$lib/utils';
	import { Check } from 'lucide-svelte';
	import Task from './task.svelte';
	import { toast } from 'svelte-sonner';
	import * as Select from '$lib/components/ui/select';

	export const offsets = [
		{
			label: 'None',
			value: 0
		},
		{
			label: '15 min',
			value: 900
		},
		{
			label: '30 min',
			value: 1800
		},
		{
			label: '45 min',
			value: 2700
		},
		{
			label: '1h',
			value: 3600
		},
		{
			label: '1.5h',
			value: 5400
		},
		{
			label: '2h',
			value: 7200
		},
		{
			label: '3h',
			value: 10800
		},
		{
			label: '4h',
			value: 14400
		}
	];

	export let data;
</script>

<div>
	<form
		method="POST"
		action="?/createNewDay"
		use:enhance={() => {
			return async ({ result, update }) => {
				toast.success(result?.data?.message);
				update();
			};
		}}
	>
		<Button type="submit" variant="outline">Create New Day</Button>
	</form>
</div>

{#if data?.activeDay}
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<div class="flex items-center justify-between">
					<span>
						{dateHandler.toFormattedDay(data.activeDay.startedAt)}
					</span>
					<form
						method="POST"
						action="?/endCurrentDay"
						use:enhance={() => {
							return async ({ result, update }) => {
								toast.success(result?.data?.message);
								update();
							};
						}}
					>
						<Button type="submit" variant="outline">End Day</Button>
					</form>
				</div>
			</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content>
			<Card.Root>
				<Card.Header>
					<Card.Title>New Task</Card.Title>
				</Card.Header>
				<Card.Content>
					<form
						method="POST"
						action="?/createNewTask"
						class="flex flex-col gap-4"
						use:enhance={() => {
							return async ({ result, update }) => {
								toast.success(result?.data?.message);
								update({ reset: false });
							};
						}}
					>
						<div class="flex gap-4">
							<Input hidden name="dayId" class="hidden" value={data.activeDay.id} />
							{#if data?.projects}
								<Select.Root items={data.projects} name="project">
									<Select.Input />
									<Select.Trigger class="w-1/4">
										<Select.Value placeholder="Project" />
									</Select.Trigger>
									<Select.Content>
										{#each data.projects as project (project.id)}
											<Select.Item value={project.tag}>
												{project.tag}
											</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							{/if}
							<Input name="ticketNr" placeholder="Ticket Nr" class="w-1/4" />
							<Input class="w-full" name="description" placeholder="Task Description" />
							<Select.Root items={offsets} name="offset">
								<Select.Input />
								<Select.Trigger class="w-1/4">
									<Select.Value placeholder="Offset" />
								</Select.Trigger>
								<Select.Content>
									{#each offsets as offset}
										<Select.Item value={offset.value}>
											{offset.label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<Button type="submit" class="w-full">Create</Button>
					</form>
				</Card.Content>
			</Card.Root>
			<div class="mt-8 flex flex-col gap-2">
				{#each data.activeDay.Tasks as task (task.id)}
					<Task {task} />
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
{:else}
	<span>No Active Tasks currently. Start a New Day</span>
{/if}
