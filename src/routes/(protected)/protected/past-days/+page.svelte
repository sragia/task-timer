<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Collapsible from '$lib/components/ui/collapsible/index';
	import { Description } from '$lib/components/ui/drawer';
	import Input from '$lib/components/ui/input/input.svelte';
	import { dateHandler } from '$lib/utils';
	import { ChevronsDownUp, ChevronsUpDown } from 'lucide-svelte';
	import Task from '../current-day/task.svelte';
	import { toast } from 'svelte-sonner';

	export let data;
</script>

{#if data?.days}
	{#each data.days as day}
		<Collapsible.Root>
			<Collapsible.Trigger
				class="flex w-full justify-between rounded border px-4 py-2 transition-all hover:bg-secondary"
			>
				{dateHandler.toFormattedDay(day.startedAt)}
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
