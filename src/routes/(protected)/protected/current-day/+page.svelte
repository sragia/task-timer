<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Description } from '$lib/components/ui/drawer';
	import Input from '$lib/components/ui/input/input.svelte';
	import { dateHandler } from '$lib/utils';
	import Task from './task.svelte';
	import { toast } from 'svelte-sonner';

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
						class="flex gap-4"
						use:enhance={() => {
							return async ({ result, update }) => {
								toast.success(result?.data?.message);
								update({ reset: false });
							};
						}}
					>
						<Input hidden name="dayId" class="hidden" value={data.activeDay.id} />
						<Input class="w-full" name="description" placeholder="Task Description" />
						<Button type="submit">Create</Button>
					</form>
				</Card.Content>
			</Card.Root>
			<div class="mt-8 flex flex-col gap-2">
				{#each data.activeDay.Tasks as task}
					<Task {task} />
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
{:else}
	<span>No Active Tasks currently. Start a New Day</span>
{/if}
