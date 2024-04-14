<script>
	import Label from '$lib/components/ui/label/label.svelte';
	import { dateHandler } from '$lib/utils';
	import * as Card from '$lib/components/ui/card/index';
	import { Check, CircleEllipsis } from 'lucide-svelte';
	import { onMount } from 'svelte';
	export let task;
	export let timeElapsed = dateHandler.timeLapsed(task.startedAt, task.endedAt || new Date());
	onMount(() => {
		if (!task.endedAt) {
			let interval = setInterval(() => {
				timeElapsed = dateHandler.timeLapsed(task.startedAt, new Date());
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

<Card.Root class="bg-secondary">
	<Card.Header>
		<Card.Title class="flex w-full items-center justify-between">
			{task.description}
			{#if task.endedAt}
				<Check color="#00800f" />
			{:else}
				<CircleEllipsis color="#fc8403" />
			{/if}
		</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-wrap gap-4">
			<div class="flex w-full justify-between">
				<div class="flex flex-col gap-2">
					<Label>Started At</Label>
					<span class="text-primary">
						{dateHandler.toTime(task.startedAt, true)}
					</span>
				</div>
				<div class="flex flex-col gap-2">
					<Label>Time Spent</Label>
					<span class="text-primary">
						{timeElapsed}
					</span>
				</div>
			</div>
			{#if task.endedAt}
				<div>
					<div class="flex flex-col gap-2">
						<Label>Ended At</Label>
						<span class="text-primary">
							{dateHandler.toTime(task.endedAt, true)}
						</span>
					</div>
				</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
