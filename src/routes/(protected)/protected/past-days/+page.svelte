<script>
	import * as Card from '$lib/components/ui/card/index';
	import * as Collapsible from '$lib/components/ui/collapsible/index';
	import { dateHandler } from '$lib/utils';
	import { ChevronsUpDown } from 'lucide-svelte';
	import Task from '../current-day/task.svelte';

	export let data;
</script>

{#if data?.days}
	{#each data.days as day}
		<Collapsible.Root>
			<Collapsible.Trigger
				class="flex w-full justify-between rounded border px-4 py-2 transition-all hover:bg-secondary"
			>
				{dateHandler.toFormattedDay(day.startedAt)}
				{#if day.endedAt}
					- {dateHandler.timeLapsed(day.startedAt, day.endedAt)}{/if}
				<ChevronsUpDown />
			</Collapsible.Trigger>
			<Collapsible.Content>
				<Card.Root>
					<Card.Content>
						<div class="mt-8 flex flex-col gap-2">
							{#each day.Tasks as task}
								<Task {task} />
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			</Collapsible.Content>
		</Collapsible.Root>
	{/each}
{:else}
	<span>No Previous Days stored currently. Start a New Day</span>
{/if}
