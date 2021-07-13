import { AnyJson } from '@/models/flag-value'
import YAML from 'yaml'
import toml from '@iarna/toml'

export function formatToYaml (file: Map<string, AnyJson>): string {
  return YAML.stringify(Object.fromEntries(file))
}

export function formatToJson (file: Map<string, AnyJson>): string {
  return JSON.stringify(Object.fromEntries(file), null, 2)
}

export function formatToToml (file: Map<string, AnyJson>): string {
  return toml.stringify(Object.fromEntries(file))
}
